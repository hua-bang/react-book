import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Form as AntdForm, Select } from 'antd';
import { XFormContext } from '../x-form';

// 封装的 Form.Item 组件
export const XFormItem = ({ children, ...props }: any) => {
  const { setSelectOptionChange } = useContext(XFormContext);

  const { name } = props;

  const handleOptionsChange = useCallback(
    (value: any, option: any) => {
      if (!name) {
        return;
      }
      setSelectOptionChange(name, value, option);
    },
    [name, setSelectOptionChange],
  );

  return (
    <AntdForm.Item {...props}>
      {React.cloneElement(children, { onOptionsChange: handleOptionsChange })}
    </AntdForm.Item>
  );
};

export default XFormItem;
