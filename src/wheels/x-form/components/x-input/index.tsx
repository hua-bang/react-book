import { InputProps, Input } from 'antd';
import React from 'react';

interface XInputProps extends InputProps {
  onOptionsChange?: any;
}

const XInput: React.FC<XInputProps> = ({
  onChange,
  onOptionsChange,
  ...props
}) => {
  const handleChange = (...args: any[]) => {
    onChange?.(...((args as unknown) as any));
    onOptionsChange?.('这是 Input 的Value', '这是 Input 的 Options');
  };

  return <Input onChange={handleChange} {...props} />;
};

export default XInput;
