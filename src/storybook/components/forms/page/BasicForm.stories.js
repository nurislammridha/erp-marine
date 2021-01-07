import React from 'react';
import { withInfo } from "@storybook/addon-info";
import BasicForm from './BasicForm';

export const BasicFormStory = () => {
    return (
      <BasicForm />
    )
}

const InfoDetailsComponent = () => {
    return (
        <>Welcome</>
    )
};
  
export default {
    title: "Forms/Page",
    decorators: [withInfo],
    component: BasicFormStory,
    parameters: {
      info: InfoDetailsComponent,
    },
};