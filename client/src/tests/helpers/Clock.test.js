import Clock from '../../helpers/Clock.js'
import moment from 'moment'

it('#ageInWeeks can calculate age in weeks from date of birth', () => {
	const dateOfBirth = moment().subtract(3, 'weeks').format('YYYY-MM-D')
	const age = Clock.ageInWeeks(dateOfBirth)
	
	expect(age).toEqual(3)
})

it('#formattedAge returns age in the correct units', () => {
	const weeksOld = moment().subtract(3, 'weeks').format('YYYY-MM-D')
	const monthsOld = moment().subtract(20, 'weeks').format('YYYY-MM-D')
	const yearsOld = moment().subtract(100, 'weeks').format('YYYY-MM-D')
	
	expect(Clock.formattedAge(weeksOld)).toEqual('3 weeks')
	expect(Clock.formattedAge(monthsOld)).toEqual('5 months')
	expect(Clock.formattedAge(yearsOld)).toEqual('1 year 11 months')
})