let userAgent = 'Meteor';
if (Meteor.release) { userAgent += `/${ Meteor.release }`; }

RocketChat.lendTokenpassToken = function(lending, cb) {
	try {
		const result = HTTP.post(
			`${ RocketChat.settings.get('API_Tokenpass_URL') }/api/v1/tca/provisional/tx`, {
				headers: {
					Accept: 'application/json',
					'User-Agent': userAgent
				},
				params: {
					client_id: RocketChat.settings.get('Accounts_OAuth_Tokenpass_id'),
					client_secret: RocketChat.settings.get('Accounts_OAuth_Tokenpass_secret')
				},
				data: {
					source: lending.source,
					destination: lending.destination,
					asset: lending.asset,
					quantity: lending.quantity,
					expiration: lending.expiration
				}
			});

		console.log(result);

		return cb(null, result && result.data && result.data.result);
	} catch (exception) {
		return cb(
			(exception.response && exception.response.data && (exception.response.data.message || exception.response.data.error)) || TAPi18n.__('Tokenpass_Command_Error_Unknown')
		);
	}
};