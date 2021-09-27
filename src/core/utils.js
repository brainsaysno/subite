/* function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export { getDistanceFromLatLonInKm };
 */

import { decode } from "@googlemaps/polyline-codec";

// TODO: Change error messages

export const emailValidator = (email) => {
	const re = /\S+@\S+\.\S+/;

	if (!email || email.length <= 0) return "Email cannot be empty.";
	if (!re.test(email)) return "Oops! We need a valid email address.";

	return "";
};

export const passwordValidator = (password) => {
	if (!password || password.length <= 0) return "Password cannot be empty.";

	return "";
};

export const nameValidator = (name) => {
	if (!name || name.length <= 0) return "Name cannot be empty.";

	return "";
};

export function isInRadius(polyline, coords, radius) {
	// Polyline is string from overview polyline: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
	// Coordinates is object with latitude and longitude keys with int values
	// Radius is float in km

	const path = decode(polyline).map((a) => {
		return { latitude: a[0], longitude: a[1] };
	});

	const coordsToLighthouse = (coords) => {
		const lighthouseCoords = {
			lat: -34.935311,
			long: -56.160579,
		};

		// Using aproximations from https://stackoverflow.com/questions/1253499/simple-calculations-for-working-with-lat-lon-and-km-distance

		return [
			(coords.longitude - lighthouseCoords.long) *
				111.32 *
				Math.cos((coords.latitude * Math.PI) / 180),
			(coords.latitude - lighthouseCoords.lat) * 110.574,
		];
	};

	const lhPath = path.map(coordsToLighthouse);
	const lhCoords = coordsToLighthouse(coords);
	const lhDistances = [];

	// Check for distance to points
	for (const el of lhPath) {
		const distance = Math.sqrt(
			(el[0] - lhCoords[0]) ** 2 + (el[1] - lhCoords[1]) ** 2
		);
		if (distance <= radius) return true;

		lhDistances.push(distance);
	}

	// Check for distance to line... FIXME: Checking for pairs, so last element is left unchecked in odd-numbered point cases
	for (let i = 1; i < lhDistances.length / 2; i++) {
		const i1 = i * 2 - 2;
		const i2 = i * 2 - 1;

		const leg1 = Math.min(lhDistances[i1], lhDistances[i2]);
		const leg2 = Math.sqrt(
			(lhPath[i1][1] - lhPath[i2][1]) ** 2 +
				(lhPath[i1][0] - lhPath[i2][0]) ** 2
		);

		const hyp = Math.max(lhDistances[i1], lhDistances[i2]);

		if (leg1 ** 2 + leg2 ** 2 <= hyp ** 2) continue;

		const a = lhPath[i2][1] - lhPath[i1][1];
		const b = lhPath[i2][0] - lhPath[i1][0];
		const c =
			(lhPath[i2][0] - lhPath[i1][0]) * lhPath[i2][1] +
			(lhPath[i1][1] - lhPath[i2][1]) * lhPath[i2][0];

		const distance =
			Math.abs(a * lhCoords[0] + b * lhCoords[1] + c) /
			Math.sqrt(a ** 2 + b ** 2);

		if (distance <= radius) return true;
	}
	return false;
}
