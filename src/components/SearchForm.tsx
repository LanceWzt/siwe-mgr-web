import React from 'react';
import { Button, DatePicker, Grid, Input, RulesProps, Select, Space } from '@arco-design/web-react';

import { FilterForm, FormWrapper, RightBtnWrapper } from '@/style/layout_style';
import { IconClose, IconSearch } from '@arco-design/web-react/icon';

interface selectOption {
    value: number | string;
    txt: string;
}

export interface InputConInt {
    field: string;
    label: string;
    placeholder: string;
    type: 'input' | 'select' | 'date';
    select_option?: selectOption[];
    rules?: RulesProps[];
}

interface formProps {
    cons: InputConInt[];
    submitFn: (values: any) => void;
    resetFn: () => void;
    loading: boolean;
}

// 根据输入的结构生成input框
const generateInput = (input: InputConInt, key: number) => {
    let inputCon: React.ReactElement | null = null;
    if (input.type === 'input') {
        inputCon = <Input placeholder={input.placeholder} />;
    } else if (input.type === 'select') {
        inputCon = (
            <Select placeholder={input.placeholder}>
                {input.select_option?.map((v, i) => {
                    return (
                        <Select.Option key={i} value={v.value}>
                            {v.txt}
                        </Select.Option>
                    );
                })}
            </Select>
        );
    } else {
        inputCon = <DatePicker.RangePicker mode='date' />;
    }
    return (
        <Grid.Col key={key} span={8} style={{ padding: '0 12px' }}>
            <FilterForm.Item field={input.field} label={input.label} rules={input.rules}>
                {inputCon}
            </FilterForm.Item>
        </Grid.Col>
    );
};

const SearchForm: React.FC<formProps> = ({ cons, submitFn, resetFn, loading }) => {
    const [searchForm] = FilterForm.useForm();

    const searchHandler = (e: Event) => {
        e.preventDefault();
        searchForm
            .validate()
            .then((values) => {
                submitFn(values);
            })
            .catch(() => {
                return;
            });
    };

    const resetHandler = () => {
        searchForm.resetFields();
        resetFn();
    };

    return (
        <FormWrapper>
            <FilterForm
                validateTrigger={[]}
                autoComplete='off'
                form={searchForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
            >
                <Grid.Row style={{ marginLeft: -12, marginRight: -12 }}>
                    {cons.map((item, index) => {
                        return generateInput(item, index);
                    })}
                </Grid.Row>
            </FilterForm>
            <RightBtnWrapper>
                <Space direction='vertical'>
                    <Button type='primary' onClick={searchHandler} loading={loading}>
                        {!loading && <IconSearch />}
                        查询
                    </Button>
                    <Button onClick={resetHandler} loading={loading}>
                        {!loading && <IconClose />}
                        重置
                    </Button>
                </Space>
            </RightBtnWrapper>
        </FormWrapper>
    );
};

export default SearchForm;
