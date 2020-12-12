const db = require('../knex');

exports.addLog = async (processId, logType, docId, docType) => {
  const log = {
    process_id: processId,
    log_type: logType,
    doc_type: docType,
    doc_id: docId,
  };

  return db('logs').insert(log);
};

exports.getLogs = async (icId, page = null, pageSize = null) => {
  let query = db('logs')
    .join('orders', 'logs.process_id', 'orders.id')
    .where({ 'orders.ic_id': icId });

  if (page != null && pageSize != null) query = query.offset(page * pageSize).limit(pageSize);

  return query
    .orderBy([{ column: 'created_on', order: 'desc' }])
    .select(
      'orders.type AS process_type',
      'logs.log_type AS log_type',
      'logs.doc_type AS doc_type',
      'logs.doc_id AS doc_id',
      'logs.process_id AS process_id',
      'logs.created_on AS created_on',
    );
};
