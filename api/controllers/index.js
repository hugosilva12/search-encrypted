

const uploadFileController = require('./upload_file_harvasted_controller');
const uploadFileForwarderController = require('./upload_file_forwarder_controller');
const userController =  require('./user_controller');
const keysController =  require('./generate_keys_controller');
module.exports = {
    uploadFileController: uploadFileController,
    userController: userController,
    uploadFileForwarderController:uploadFileForwarderController,
    keysController:keysController
  };
  