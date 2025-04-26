export interface Comment {
    _id: string;
    ticket: string;
    createdByUser: {
      _id: string;
      email: string;
      firstName?: string;
      lastName?: string;
    };
    comment: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  