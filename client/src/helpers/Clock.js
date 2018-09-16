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
}

export default Clock