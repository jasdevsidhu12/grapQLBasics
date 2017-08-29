module.exports = (pgPool) => {
    return {
        getUsers: function(apiKey) {
            try {
                return pgPool.query('select * from users where api_key = $1', [apiKey])
                .then((res) => {
                    const row = res.rows[0];
                    return {
                        id: row.id,
                        email: row.email,
                        firstName: row.first_name,
                        lastName: row.last_name,
                        createdAt: row.created_at.toString()
                    }
                    return res.rows[0];
                }).catch((err) => {
                    throw new Error(err);
                });
            } catch(err) {
                console.error(err);
            }
        },
        getContests: (user) => {
            return pgPool.query('select * from contests where created_by = $1', [user.id])
            .then((res) => {
                return res.rows.map((obj) => {
                    return {
                        id: obj.id,
                        code: obj.code,
                        title: obj.title,
                        status: obj.status,
                        createdAt: obj.created_at,
                        createdBy: obj.created_by
                    }
                });
            })
            //  return [{id:"1",code:"ddd"},{id:"2",code:"ded"}];
        }
    }
};