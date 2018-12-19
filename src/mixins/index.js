class _MiXin {
	constructor () {

	}
	dateFormat (date) {
		return typeof date !== 'string' ? '' : date.substr(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1.$2.$3中雷')
	}
}
const MiXin = new _MiXin()
export default { MiXin }