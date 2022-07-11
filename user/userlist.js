var mysql = require('mysql')
var $conf = require('../conf/db.js')
var $util = require('../util/util.js')
var $sql = require('./usersql.js')

var pool = mysql.createPool($util.extend({}, $conf.mysql))

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

module.exports = {
    useradd: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;
            connection.query($sql.userinsert, [param.name, param.age], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '增加成功'
                    }
                }
                jsonWrite(res, result)

                connection.release()
            })
        })
    },
    userdelete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function (err, connection) {
            var id = +req.query.id
            connection.query($sql.userdelete, id, function (err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    }
                } else {
                    result = void 0
                }
                jsonWrite(res, result)
                connection.release()
            })
        })
    },
    userupdate: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;

            connection.query($sql.userupdate, [param.name, param.age], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: '修改成功'
                    }
                }
                jsonWrite(res, result)
                connection.release()
            })
        })
    },
    userall: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.userAll, function (err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

}
