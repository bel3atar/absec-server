var db = new Mongo().getDB('absec');
var data = {}, S = 'Sujet ', Qs = 30;
var arr = ['Correct', 'Wrong 1', 'Wrong 2', 'Wrong 3'];
for (var d1 = 1, d1 <= 3; ++d1) {
	data[S + d1] = {subjects: []};
	for (var i = 0; i < Qs; ++i) data[S + d1].questions = arr;
	for (var d2 = 1, d2 <= 3; ++d2) {
		data[S + d1].subjects.[S + [d1, d2].join()] = {};
		for (var d3 = 1, d3 <= 3; ++d3) {
			data[S + d1][S + [d1, d2].join()][S + [d1, d2, d3].join()] = {};
