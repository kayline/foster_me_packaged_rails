import Clock from '../../helpers/Clock.js'
import moment from 'moment'

it('#ageInWeeks can calculate age in weeks from date of birth', () => {
	const dateOfBirth = moment().subtract(3, 'weeks').format('YYYY-MM-D')
	const age = Clock.ageInWeeks(dateOfBirth)
	
	expect(age).toEqual(3)
})

it('#formattedAge returns age in the correct units', () => {
	const weeksOld = moment().subtract(3, 'weeks').format('YYYY-MM-DD')
	const monthsOld = moment().subtract(20, 'weeks').format('YYYY-MM-DD')
	const yearsOld = moment().subtract(100, 'weeks').format('YYYY-MM-DD')
	
	expect(Clock.formattedAge(weeksOld)).toEqual('3 weeks')
	expect(Clock.formattedAge(monthsOld)).toEqual('5 months')
	expect(Clock.formattedAge(yearsOld)).toEqual('1 year 11 months')
})

it('#timeSinceRecent returns duration in the correct units', () => {
	const short = moment().subtract(3, 'days').format('YYYY-MM-DD')
	const medium = moment().subtract(15, 'days').format('YYYY-MM-DD')
	const long = moment().subtract(100, 'days').format('YYYY-MM-DD')
	
	expect(Clock.timeSinceRecent(short)).toEqual('3 days ago')
	expect(Clock.timeSinceRecent(medium)).toEqual('2 weeks ago')
	expect(Clock.timeSinceRecent(long)).toEqual('more than a month ago')
})