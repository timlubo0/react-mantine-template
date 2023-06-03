import { useMemo } from 'react';
interface Props{
    key?: string;
    value?: string;
    data: Array<any>;
}

interface ISelect{
    value: string;
    label: string;
}

export const useSelectMemo = ({ key = 'id', value = 'name', data }: Props) => {

    const selectData: ISelect[] = useMemo(() => {
        if (data === undefined) return [];
        return data.map((row) => ({
          value: row[key],
          label: row[value],
        }));
    }, [data]);

    return selectData;
}