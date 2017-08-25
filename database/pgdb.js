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
        getContests: (obj) => {
            return [{id:"1",code:"ddd"},{id:"2",code:"ded"}];
        }
    }
};