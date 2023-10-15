import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Form as AntdForm, FormProps } from 'antd';

// 创建一个上下文
export const XFormContext = createContext<any>(null);

interface XFormProps<T> extends FormProps<T> {
  onStateChange?: (params: Record<string, any>) => void;
  children: any;
}

// 封装的 Form 组件
export const XForm = <T,>({
  children,
  onStateChange,
  ...props
}: XFormProps<T>) => {
  const [selectOptionState, setSelectOptionState] = useState({});

  const setSelectOptionChange = useCallback(
    (name: any, value: any, option: any) => {
      setSelectOptionState(prevState => {
        const newState = { ...prevState, [name]: { option, value } };
        onStateChange && onStateChange(newState);
        return newState;
      });
    },
    [onStateChange],
  );

  const contextValue = useMemo(
    () => ({
      selectOptionState,
      setSelectOptionChange,
    }),
    [selectOptionState, setSelectOptionChange],
  );

  return (
    <XFormContext.Provider value={contextValue}>
      <AntdForm {...props}>{children}</AntdForm>
    </XFormContext.Provider>
  );
};

export default XForm;
