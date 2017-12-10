import vue from '../../main'

/**
 * 普通提示消息
 * @param msg
 */
export const message = (msg) => { vue.$message(msg) }

/**
 * 成功提示消息
 * @param msg
 */
export const messageSuccess = (msg) => { vue.$message({message: msg, type: 'success'}) }

/**
 * 警告提示消息
 * @param msg
 */
export const messageWarn = (msg) => { vue.$message({message: msg, type: 'warning'}) }

/**
 * 错误提示消息
 * @param msg
 */
export const messageError = (msg) => { vue.$message.error(msg) }

/**
 * 普通通知消息
 * @param msg
 */
export const notify = (msg) => { vue.$notify.info({title: '消息', message: msg}) }

/**
 * 成功通知消息
 * @param msg
 */
export const notifySuccess = (msg) => { vue.$notify({title: '成功', message: msg, type: 'success'}) }

/**
 * 警告通知消息
 * @param msg
 */
export const notifyWarn = (msg) => { vue.$notify({title: '警告', message: msg, type: 'warning'}) }

/**
 * 错误通知消息
 * @param msg
 */
export const notifyError = (msg) => { vue.$notify.error({title: '错误', message: msg}) }
