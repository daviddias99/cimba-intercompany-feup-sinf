import React from 'react';

import MultiLabel from 'components/common/MultiLabel';

import './styles.scss';

const MultiLabelInput = () => {
  return (
    <div className="multi-label-input is-flex is-flex-direction-column is-align-items-end">
      <MultiLabel color="#DF2B2B" name="blacklist" action="default" />
      <MultiLabel color="#FF9F40" name="crawler" action="edit" />
      <MultiLabel color="#FF6384" name="scrapper" action="edit" />
      <MultiLabel color="#C4C4C4" name="" action="add" />
      <MultiLabel color="#4BC0C0" name="whitelist" action="default" />
      <MultiLabel color="#36A2EB" name="google bot" action="edit" />
      <MultiLabel color="#C4C4C4" name="" action="add" />
      <MultiLabel color="#9966FF" name="unknown" action="default" />
      <MultiLabel color="#C4C4C4" name="" action="add" />
    </div>
  );
};

export default MultiLabelInput;
