import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"

class Clock {
	static ageInWeeks(dateOfBirth) {
		return moment().diff(dateOfBirth, 'weeks')
	}

	static formattedAge(dateOfBirth) {
		const ageInWeeks = this.ageInWeeks(dateOfBirth)
		const duration = moment.duration(ageInWeeks, 'weeks')

		if(ageInWeeks < 12) {
			return duration.format("W [weeks]")
		} else {
			return duration.format("Y [years] M [months]")
		}
	}

	static timeSinceRecent(date) {
		const daysSince = moment().diff(date, 'days')
		const duration = moment.duration(daysSince, 'days')

		if(daysSince < 10) {
			return duration.format('D [days] [ago]')
		} else if(daysSince < 32){
			return duration.format('W [weeks] [ago]')
		} else {
			return 'more than a month ago'
		}
	}
}

export default Clock