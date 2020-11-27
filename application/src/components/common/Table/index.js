import React from 'react';

import Paginator from 'components/common/Paginator';
import Label from 'components/common/Label';
import ShowMoreLess from 'components/common/ShowMoreLess';
import Proptypes from 'prop-types';

import './style.scss';

// To draw the method label specify the position
const Table = ({ headerAtributes, drawMethodPosition, drawIpListingPosition, drawGroupPosition, data, curPage, nPages, callBackUrl, setLoading }) => {
  const drawHeader = (items) => {
    return items.map(item => (
      <th key={item}>
        {item}
      </th>
    ));
  };
  const drawIpListing = (ips) => {
    const ipsParsed = ips.split('\n');
    return (
      <ShowMoreLess
        showMoreString={'SEE ALL ' + ipsParsed.length + ' IPS'}
        showLessString={'HIDE IPS'}
        data={ipsParsed}
      />
    );
  };
  const drawMethodLabel = (method) => {
    switch (method) {
      case 'GET':
        return (
          <Label
            color="#26AA6C"
            textColor="white"
          >
            {method}
          </Label>
        );
      case 'POST':
        return (
          <Label
            color="#FFC857"
            textColor="black"
          >
            {method}
          </Label>
        );
      case 'PUT':
        return (
          <Label
            color="#00B4D8"
            textColor="white"
          >
            {method}
          </Label>
        );
      case 'DELETE':
        return (
          <Label
            color="#DF2B2B"
            textColor="white"
          >
            {method}
          </Label>
        );
      default:
        return (
          <Label>
            {method}
          </Label>
        );
    }
  };
  const drawGroupLabel = (group) => {
    return (
      <Label
        color={group.color}
        textColor="white"
      >
        {group.name}
      </Label>
    );
  };
  const drawData = (items) => {
    if (!items) {
      return;
    }
    return items.map(item => (
      <tr key={item[0]}>
        {item.map((cur, i) => {
          if (i === 0) { // first is id
            return;
          }
          if (i === drawMethodPosition) {
            return (
              <td key={i}>
                {drawMethodLabel(cur)}
              </td>
            );
          }
          if (i === drawIpListingPosition) {
            return (
              <td key={i}>
                {drawIpListing(cur)}
              </td>
            );
          }
          if (i === drawGroupPosition) {
            return (
              <td key={i}>
                {drawGroupLabel(cur)}
              </td>
            );
          }
          return (
            <td key={i}>
              {cur}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table className="table has-text-centered is-fullwidth">
        <thead className="table-header">
          <tr>
            {drawHeader(headerAtributes)}
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan={headerAtributes.length}>
              <Paginator
                currentPage={curPage}
                pagesNum={nPages}
                callBackUrl={callBackUrl}
                setLoading={setLoading}
              />
            </td>
          </tr>
        </tfoot>
        <tbody className="table-body">
          {drawData(data)}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  headerAtributes: Proptypes.arrayOf(Proptypes.string),
  drawMethodPosition: Proptypes.number,
  drawIpListingPosition: Proptypes.number,
  drawGroupPosition: Proptypes.number,
  data: Proptypes.arrayOf(Proptypes.array),
  curPage: Proptypes.number,
  nPages: Proptypes.number,
  callBackUrl: Proptypes.func,
  setLoading: Proptypes.func,
};

export default Table;