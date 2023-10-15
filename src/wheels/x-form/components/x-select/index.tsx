import { Select, SelectProps } from 'antd';
import React from 'react';

interface XSelectProps extends SelectProps {
  onOptionsChange?: any;
}

const XSelect: React.FC<XSelectProps> = ({
  onChange,
  onOptionsChange,
  ...props
}) => {
  const handleChange = (...args: any[]) => {
    onChange?.(...((args as unknown) as any));
    onOptionsChange?.('这是选择的Value', '这是选择的 Options');
  };

  return <Select onChange={handleChange} {...props} />;
};

export default XSelect;
