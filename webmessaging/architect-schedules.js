const rrulestr = require('rrule').rrulestr;
const moment = require('moment');
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

function isCurrentlyInSchedule(schedule) {
	var rule = rrulestr('RRULE:' + schedule.rrule);

	var nextOccurance = rule.after(moment().startOf('day').toDate(), true);
	console.log(`nextOccurance ${nextOccurance}`);

	var doesMatchDay = moment(nextOccurance).isSame(moment(), 'day');

	if (!doesMatchDay) {
		return false;
	}

	var date = moment().format('YYYY-MM-DD');

	var start = moment(date + 'T' + schedule.start.split('T')[1]);
	var end = moment(date + 'T' + schedule.end.split('T')[1]);

	return moment().isBetween(start, end);
}


function evaluateScheduleGroup(scheduleGroup) {
	console.log('evaluateScheduleGroup', scheduleGroup)
	let architectApi = new platformClient.ArchitectApi();

	let openSchedulePromises = [];
	let closedSchedulePromises = [];

	for (let x = 0; x < scheduleGroup.openSchedules.length; x++) {
		openSchedulePromises.push(architectApi.getArchitectSchedule(scheduleGroup.openSchedules[x].id));
	}

	for (let x = 0; x < scheduleGroup.closedSchedules.length; x++) {
		closedSchedulePromises.push(architectApi.getArchitectSchedule(scheduleGroup.closedSchedules[x].id));
	}
	console.log('openSchedulePromises', openSchedulePromises)
	console.log('closedSchedulePromises', closedSchedulePromises)

	Promise.all(openSchedulePromises)
		.then((openSchedules) => {
			let isOpen = false;

			for (let x = 0; x < openSchedules.length; x++) {
				if (isCurrentlyInSchedule(openSchedules[x])) {
					isOpen = true;
				}
			}

			if (isOpen) {
				Promise.all(closedSchedulePromises).then((closedSchedules) => {
					for (let x = 0; x < closedSchedules.length; x++) {
						if (isCurrentlyInSchedule(closedSchedules[x])) {
							isOpen = false;
						}
					}
					console.log(`IVR is open? ${isOpen}`);
				});
			} else {
				console.log(`IVR is open? ${isOpen}`);
			}
		})
		.catch(console.log);
}


const GENESYS_CLOUD_CLIENT_ID = 'a35e979e-ca57-4818-86f0-782500ae95ef'
const GENESYS_CLOUD_CLIENT_SECRET = '754QgUYNibFluRDaTELQ_R7UTjmiave9UBErWDMXSOE'
const GENESYS_CLOUD_REGION = 'ap_northeast_1'

// Get client credentials from environment variables
const CLIENT_ID = GENESYS_CLOUD_CLIENT_ID;
const CLIENT_SECRET = GENESYS_CLOUD_CLIENT_SECRET;
const ORG_REGION = GENESYS_CLOUD_REGION; // eg. us_east_1

// Set environment
const environment = platformClient.PureCloudRegionHosts[ORG_REGION];
console.log(environment)
if(environment) client.setEnvironment(environment);
console.log('client', client.loginClientCredentialsGrant)
client
	.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET)
	.then(() => {
		console.log('loginClientCredentialsGrant success')
		var architectApi = new platformClient.ArchitectApi();

		// const IVR_NAME = 'Queue 1';
		// architectApi
		// 	.getArchitectIvrs({ name: IVR_NAME })
		// 	.then((ivrs) => {
		// 		console.log(ivrs);
		// 		let ivr = ivrs.entities[0];

				// let scheduleGroupId = ivr.scheduleGroup.id;
				let scheduleGroupId = '5b44c1b6-3fc6-4bab-9633-5f273b057926'

				architectApi.getArchitectSchedulegroup(scheduleGroupId).then(function(scheduleGroup) {
					evaluateScheduleGroup(scheduleGroup);
				});
			// })
			// .catch(console.log);

	})
	.catch(console.log);
