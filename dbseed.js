var db = new Mongo().getDB('absec');

//themes
db.themes.insert({
	Sport: [{
		Football: [{
			'Coupe du monde': [{
				'Quel pays a gagné la première coupe du monde en 1930?': [
					'Uruguay', 'Brésil', 'Argentine', 'Espagne'
				],
			}]
		}],
		Tennis: [{
			'Wimbledon': [{
				'Première année d\'orgranistaion': [
					'1877', '1867', '1857', '1847'
				],
				'Premier joueur indien ayant participé': [
					'Harjeet Singh', 'Nihal Singh', 'Leander Peas', 'Zeeshan Ali'
				]
			}],
			'French Open': [{
				'Le championnat French Open a lieu à Paris dans': [
					'Court Bastille', 'Roland Garros', 'Carnot', 'Paul Valéry'
				],
				'Quel joueur indien a gagné le premier French Open Junior?': [
					'Vijay Amritraj', 'Leander Paes', 'Sania Mirja', 'Mahsh Bhupati'
				],
				'En quelle année a été organisé le premier French Open': [
					'1891', '1920', '1925', '1909'
				]
			}]
		}]
	}]
});
