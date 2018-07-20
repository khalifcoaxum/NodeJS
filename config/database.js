module.exports = {
	credentials: {
		user: process.env.HR_USER,
		password: process.env.HR_PASSWORD,
		connectStr: process.env.HR_CONNECTIONSTRING,
		poolMin: 10,
		poolMax: 10,
		poolIncrement: 0
	}
};