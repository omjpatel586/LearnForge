import { ReactNode } from 'react';

interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <main className="flex-1 mx-8 max2xs:mx-4 pt-20 pb-10">{children}</main>;
};

export default ContentWrapper;
