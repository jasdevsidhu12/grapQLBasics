module.exports = (pgPool) => {
    return {
        getUsersByIds: function(userIDs) {
            try {
                return pgPool.query('select * from users where id = ANY($1)', [userIDs])
                .then((res) => {
                    const row = res.rows[0];
                    return {
                        id: row.id,
                        email: row.email,
                        firstName: row.first_name,
                        lastName: row.last_name,
                        createdAt: row.created_at.toString()
                    }
                }).catch((err) => {
                    throw new Error(err);
                });
            } catch(err) {
                console.error(err);
            }
        },
        getUserByApiKey: function(apiKey) {
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
            });
        },
        getNames(contest) {
            return pgPool.query('select * from names where contest_id = $1', [contest.id])
            .then(res => {
                return res.rows.map((obj) => {
                    return {
                        id: obj.id,
                        label: obj.label,
                        description: obj.description,
                        createdBy: obj.created_by,
                        createdAt: obj.created_at
                    };
                });
            });
        }
    }
};