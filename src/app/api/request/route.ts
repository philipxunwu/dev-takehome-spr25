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
            id: newId, 
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
        const pageParam = url.searchParams.get('page');

        let page = parseInt(pageParam as string, 10); 
        if (isNaN(page) || page < 1) {
            page = 1; 
        }

        const skipCount = (page - 1) * PAGINATION_PAGE_SIZE; 

        const requests = await RequestModel.find({})
            .sort({ createdAt: -1 }) 
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
