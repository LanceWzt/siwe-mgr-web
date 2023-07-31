import React from 'react';
import { PaginationProps, Table } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';

export interface TblProps {
    columns_config: ColumnProps[];
    loading: boolean;
    columns_data: any[];
    pagination: PaginationProps;
}

const InfoTable: React.FC<TblProps> = ({ columns_config, columns_data, loading, pagination }) => {
    columns_config.forEach((item) => {
        item.align = 'center';
    });

    pagination.showTotal = true;
    pagination.showJumper = true;
    pagination.size = 'small';

    return (
        <Table
            border={false}
            stripe
            columns={columns_config}
            data={columns_data}
            loading={loading}
            pagination={pagination}
        />
    );
};

export default InfoTable;
