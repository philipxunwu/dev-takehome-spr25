import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IRequest {
  id: string;
  requestorName: string;
  itemRequested: string;
  createdDate: Date;
  lastEditedDate?: Date;
  status: 'pending' | 'completed' | 'approved' | 'rejected';
}

const RequestSchema: Schema<IRequest> = new Schema<IRequest>({
  id: {
    type: String,
    required: [true, 'ID is required.'],
    unique: true // Enforces a unique index on the ID field
  },
  requestorName: {
    type: String,
    required: [true, 'Requestor name is required.'],
    minlength: [3, 'Requestor name must be between 3 and 30 characters.'],
    maxlength: [30, 'Requestor name must be between 3 and 30 characters.']
  },
  itemRequested: {
    type: String,
    required: [true, 'Item requested is required.'],
    minlength: [2, 'Item requested must be between 2 and 100 characters.'],
    maxlength: [100, 'Item requested must be between 2 and 100 characters.']
  },
  createdDate: {
    type: Date,
    required: [true, 'Creation date is required.']
  },
  lastEditedDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: [true, 'Status is required.'],
    enum: {
      values: ['pending', 'completed', 'approved', 'rejected'],
      message: 'Status must be one of: pending, completed, approved, rejected.'
    }
  }
}, {
  collection: 'requests'
});

const RequestModel: Model<IRequest> = mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema);

export default RequestModel;