const connections = require("./database");
const { formatDateTime } = require("../utils/time");

const selectGroupByInitiatorName = async (initiatorName) => {
  const statement = `select g.* from sgroup g join initiator i on g.initiator_id = i.initiator_id where i.initiator_name = '${initiatorName}'`;
  const result = await connections.execute(statement);

  return result[0];
};

// 新建签到
const createNewSign = async (sign_id, group_id, initiator_id, sign_code) => {
  const statement = `insert into sign(sign_id, initiator_id, group_id, create_at, isFinsh, sign_code) values(${sign_id}, ${initiator_id}, ${group_id}, '${formatDateTime(
    sign_id
  )}', 0, '${sign_code}')`;
  const result = await connections.execute(statement);

  return result[0];
};

// 结束签到
const endSign = async (sign_id, last_at) => {
  const statement = `update sign set isFinsh = 1, last_at = '${last_at}' where sign_id = '${sign_id}'`;
  const result = await connections.execute(statement);

  return result[0];
};

const selectSignBySignCode = async (sign_code) => {
  const statement = `select * from sign where sign_code = '${sign_code}' and isFinsh = 0`;
  const result = await connections.execute(statement);

  return result[0];
};

// 用户签到
const userCheckIn = async (user_id, sign_id, sign_time, mac, is_mac_error) => {
  const statement = `insert into sign_user(user_id, sign_id, sign_time, now_user_mac, is_mac_error) values('${user_id}', '${sign_id}', '${sign_time}', '${mac}', ${is_mac_error})`;
  const result = await connections.execute(statement);

  return result[0];
};

// 用户查看签到记录
const selectSignHistory = async (user_id) => {
  const statement = `select sgroup.group_name, initiator.initiator_name, sign_user.sign_time, sign_user.is_mac_error from initiator
  join sgroup on sgroup.initiator_id = initiator.initiator_id
  join sign on sign.group_id = sgroup.group_id
  join sign_user on sign_user.sign_id = sign.sign_id and user_id = '${user_id}';`;
  const result = await connections.execute(statement);

  return result[0];
};

// 管理员查看签到记录
const selectSignHistoryByUserName = async (user_name) => {
  const statement = `select user.user_name, sgroup.group_name, initiator.initiator_name, sign_user.sign_time, sign_user.is_mac_error from initiator
  join sgroup on sgroup.initiator_id = initiator.initiator_id
  join sign on sign.group_id = sgroup.group_id
  join sign_user on sign_user.sign_id = sign.sign_id 
	join user on user.user_id = sign_user.user_id and user.user_name = "${user_name}";`;
  const result = await connections.execute(statement);

  return result[0];
};

// 查找所有的用户
const selectAllUser = async () => {
  const statement = "select * from user";
  const result = await connections.execute(statement);

  return result[0];
};

const selectSignBySignAndUserId = async (sign_id, user_id) => {
  const statement = `select * from sign_user where sign_id = '${sign_id}' and user_id = '${user_id}'`;
  const result = await connections.execute(statement);

  return result[0];
};

// 插入数据
const insertUserInfo = async (datas) => {
  let statement = "insert into user(user_id, user_name, user_account, user_password) values";
  datas.forEach((item) => {
    statement += `('${item.user_id}', '${item.user_name}', '${item.user_account}', '${item.user_password}'), `;
  });
  statement = statement.replace(/,([^,]*)$/, "$1");

  const result = await connections.execute(statement);

  return result[0];
};

// 查找用户通过user_id
const selectUserByUserId = async (user_id) => {
  const statement = `select * from user where user_id = '${user_id}'`;
  const result = await connections.execute(statement);

  return result[0];
};

// 更新用户的mac
const updateUserMacByUserId = async (mac, user_id) => {
  const statement = `update user set user_mac = '${mac}' where user_id = '${user_id}'`;
  const result = await connections.execute(statement);

  console.log(result);

  return result[0];
};

// 查找发起者的未结束的签到码
const selectSignByInitiatorId_isFinsh = async (initiator_id) => {
  const statement = `select * from sign where initiator_id = '${initiator_id}' and isFinsh = 1 order by create_at desc`;
  const result = await connections.execute(statement);

  return result[0];
};

module.exports = {
  selectGroupByInitiatorName,
  createNewSign,
  endSign,
  selectSignBySignCode,
  userCheckIn,
  selectSignHistory,
  selectSignBySignAndUserId,
  insertUserInfo,
  selectSignHistoryByUserName,
  selectAllUser,
  selectUserByUserId,
  updateUserMacByUserId,
  selectSignByInitiatorId_isFinsh
};
