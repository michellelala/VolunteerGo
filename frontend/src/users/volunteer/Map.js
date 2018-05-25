import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Map extends Component {
	componentDidMount() {
		this.loadMap()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
			this.loadMap();
		}
	}

	loadMap() {
		if (this.props && this.props.google) {
			const { google, allOrgs } = this.props;

			if (navigator.geolocation) {
				let pos, infoWindow;
				const maps = google.maps;
				const mapRef = this.refs.map;
				const node = ReactDOM.findDOMNode(mapRef);

				let zoom = 14;
				let lat = 40.730610; // default lat
				let lng = -73.935242; // default long == NYC
				const center = new maps.LatLng(lat, lng)
				const mapConfig = Object.assign({}, {
					center: center,
					zoom: zoom
				})
				this.map = new maps.Map(node, mapConfig)
				
				// Find the user's current location
				navigator.geolocation.getCurrentPosition((position) => {
					infoWindow = new google.maps.InfoWindow();

					pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}

					const marker = new google.maps.Marker({
						position: pos,
						map: this.map,
						title: "Current position."
					})

					infoWindow.setPosition(pos)
					infoWindow.setContent("You are here.")
					infoWindow.open(this.map)
					this.map.setCenter(pos)
				}, function() {
						this.handleLocationError(true, infoWindow, this.map.getCenter());
						}
					);
				} else {
					// Browser doesn't support Geolocation
					let infoWindow = new google.maps.InfoWindow;
					this.handleLocationError(false, infoWindow, this.map.getCenter());
				}

				const geocoder = new google.maps.Geocoder();
				// Map through orgs to create an array of org addresses
				const orgAddresses = allOrgs.map(org => org.address)
				orgAddresses.map(orgAddress => {
					this.geocodeAddress(geocoder, this.map, orgAddress)
				})

		}
	}

	// ----- Helper Functions -----
	geocodeAddress = (geocoder, resultsMap, address) => {
		const { google } = this.props;
		console.log('youre in geocodeAddress.')
		console.log("geocoder: ", geocoder)
		console.log("resultsMap: ", resultsMap)
		console.log("address: ", address)

		geocoder.geocode({ "address": address }, function(results, status) {
			if (status === "OK") {
				const marker = new google.maps.Marker({
					map: resultsMap,
					position: results[0].geometry.location
				})
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		})
	}

	handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
													'Error: The Geolocation service failed.' :
													'Error: Your browser doesn\'t support geolocation.');
		infoWindow.open(this.map);
	}

	render() {
		const style = { width: "50vw", height: "50vh" }

		return (
			<div ref="map" style={style}>
				Loading map...
			</div>
		)
	}
}