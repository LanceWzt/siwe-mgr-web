export enum TOPIC_TYPE {
    MEMBER_NEWS = 1,
    FINANCIAL_INFO = 2,
    INDUSTRY_NEWS = 3
}

export enum TOPIC_STATUS {
    ACTIVE = 1,
    INACTIVE = 0
}

export interface IGetTopic {
    topic_id: string;
}

export interface IEditTopic {
    topic_id: string;
    title: string;
    time?: string;
    type?: string;
    content: string;
}

export interface IGetTopicList {
    type: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    state?: number;
    page?: number;
}

export interface IActivateTopic {
    topic_id: string;
    state: TOPIC_STATUS;
}

export interface IDelTopic {
    topic_id: string;
}

export interface IAddTopic {
    title: string;
    time: string;
    content: string;
    type: string;
}
