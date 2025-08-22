import { 
    ResponseType,
    HTTP_STATUS_CODE,
    RESPONSES, 
} from "@/lib/types/apiResponse";

import { RequestStatus} from "@/lib/types/request";

import dbConnect from "@/lib/mongodb";
import { NextResponse } from 'next/server'; 
import RequestModel, {IRequest} from "../../models/Request";
import { v4 as uuidv4 } from 'uuid';
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";

export async function PUT(request: Request) {
    try {
        await dbConnect(); 

        const { requestorName, itemRequested }= await request.json(); 

        const newId = uuidv4(); 
        const currentDate = new Date(); 

        const newRequestData: IRequest = {
            _id: newId, 
            requestorName: requestorName, 
            itemRequested: itemRequested, 
            createdDate: currentDate, 
            lastEditedDate: currentDate, 
            status: 'pending', 
        };

        const newRequest = await RequestModel.create(newRequestData);
        const successResponse = RESPONSES[ResponseType.CREATED];

        return NextResponse.json(
            { message: successResponse.message }, 
            { status: successResponse.code } 
        );
    } catch (error: any) {

        if (error.name === 'ValidationError') {
            const errorResponse = RESPONSES[ResponseType.INVALID_INPUT]

            return NextResponse.json(
                { message: errorResponse.message }, 
                { status: errorResponse.code }, 
            )
        }

        const errorResponse = RESPONSES[ResponseType.UNKNOWN_ERROR]; 

        return NextResponse.json(
            { message: errorResponse.message }, 
            { status: errorResponse.code }, 
        )
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect(); 

        const url = new URL(request.url); 
        const page = parseInt(url.searchParams.get("page") || "1"); 
        const status = url.searchParams.get("status")     

        const skipCount = (page - 1) * PAGINATION_PAGE_SIZE; 

        let query = {}
        if (status) {
            query = {
                status: status, 
            }
        }

        const requests = await RequestModel.find(query)
            .sort({ createdDate: -1 }) 
            .skip(skipCount) 
            .limit(PAGINATION_PAGE_SIZE)
            .exec(); 

        const successResponse = RESPONSES[ResponseType.SUCCESS]; 
        
        const responseData = {
            message: successResponse.message,
            data: {
                items: requests, 
            }
        };

        return NextResponse.json(responseData, { status: successResponse.code } );
    } catch (error: any) {
        const errorResponse = RESPONSES[ResponseType.UNKNOWN_ERROR];

        return NextResponse.json(
            { 
                message: errorResponse.message,
                data: null,
            },
            { status: errorResponse.code }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        await dbConnect(); 

        const { id, status }= await request.json(); 
        const editTime = new Date(); 

        const updatedData = {
            status: status, 
            lastEditedDate: editTime, 
        }

        const updatedRequest = await RequestModel.findByIdAndUpdate(
            id, 
            updatedData,
            { new: true, runValidators: true }
        ).exec(); 

        if (!updatedRequest) {
            const notFoundResponse = RESPONSES[ResponseType.NOT_FOUND]
            return NextResponse.json(
                { message: notFoundResponse.code }, 
                { status: notFoundResponse.code }
            )
        }

        
        const successResponse = RESPONSES[ResponseType.SUCCESS]; 
        const responseData = {
            message: successResponse.message,
            data: updatedRequest, 
        }
        return NextResponse.json(
            responseData, 
            { status: successResponse.code } 
        );
    } catch (error: any) {
        const errorResponse = RESPONSES[ResponseType.UNKNOWN_ERROR];

        return NextResponse.json(
            { 
                message: errorResponse.message,
                data: null,
            },
            { status: errorResponse.code }
        );
    }
}

export async function DELETE(request: Request) {
    // test endpoint to clear mongodb as needed
    try { 
        await dbConnect(); 

        const result = await RequestModel.deleteMany({});

        return NextResponse.json({ 
            message: "Successfully deleted all items.", 
        }, { status: HTTP_STATUS_CODE.OK })
    } catch (error) {
        return NextResponse.json({
            message: "An error occurred while deleting items.",
        }, { status: 500 });
    }
}