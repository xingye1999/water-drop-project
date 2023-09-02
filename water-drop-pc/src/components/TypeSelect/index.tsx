import { useProductTypes } from '@/services/product';
import { Select } from 'antd';

interface IProps {
  value?: string;
  onChange?: (val: string) => void;
}

/**
*  商品分类选择器
*/
const TypeSelect = ({
  value,
  onChange,
}: IProps) => {
  const { data } = useProductTypes();

  const onChangeHandler = (val: string) => {
    onChange?.(val);
  };

  return (
    <Select
      placeholder="请选择分类"
      value={value}
      onChange={onChangeHandler}
    >
      {data?.map((item) => (
        <Select.Option
          key={item.key}
          value={item.key}
        >
          {item.title}
        </Select.Option>
      ))}
    </Select>
  );
};

TypeSelect.defaultProps = {
  value: undefined,
  onChange: () => {},
};

export default TypeSelect;
