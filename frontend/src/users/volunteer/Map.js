import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Map extends Component {
	componentDidMount() {
		this.loadMap()
		// console.log("props in Map CDM: ", this.props)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.google !== this.props.google) {
			this.loadMap();
		}
		this.loadMap();
		// console.log("props in Map CDU: ", this.props)

		if (prevProps.selectedOrg !== this.props.google) {
			this.loadMap()
		}
	}

	loadMap() {
		if (this.props && this.props.google) {
			const { google, allOrgs, selectedOrg } = this.props;
			console.log("selected org: ", selectedOrg)

			// User has to approve location tracking
			if (navigator.geolocation) {
				let pos, infoWindow;
				const maps = google.maps;
				const mapRef = this.refs.map;
				const node = ReactDOM.findDOMNode(mapRef);
				
				let zoom = 14;
				let lat = 40.730610; // default lat for NYC
				let lng = -73.935242; // default long for NYC
				const center = new maps.LatLng(lat, lng)
				const mapConfig = Object.assign({}, {
					center: center,
					zoom: zoom
				})
				this.map = new maps.Map(node, mapConfig)
				
				// Find the user's current location
				navigator.geolocation.getCurrentPosition((position) => {
					infoWindow = new google.maps.InfoWindow();
					// Set pos variable to user's current position
					pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
					// Create new marker, with position set to user's current position
					const marker = new google.maps.Marker({
						position: pos,
						map: this.map,
						title: "Current position."
					})
					// Set the info window to current posiiton
					infoWindow.setPosition(pos)
					infoWindow.setContent("You are here.")
					infoWindow.open(this.map)
					this.map.setCenter(pos)
				}, function() {
						this.handleLocationError(true, infoWindow, this.map.getCenter());
						}
					);

					const geocoder = new google.maps.Geocoder();
					// Map through all orgs and create a marker
					allOrgs.map(org => {
						this.geocodeAddress(geocoder, this.map, org.address, org.name)
					})
			} else {
				// Browser doesn't support Geolocation, user can't be located
				let infoWindow = new google.maps.InfoWindow;
				this.handleLocationError(false, infoWindow, this.map.getCenter());
			}

			if (selectedOrg) {
				const { selectedOrg } = this.props;
				const geocoder = new google.maps.Geocoder();
				const infoWindow = new google.maps.InfoWindow();
				
			}
		}
			
	}

	// ---------- Helper Functions ---------- //
	handleOrgClick = (geocoder, resultsMap, clickedOrg, infoWindow) => {
		const { google } = this.props;

		geocoder.geocode({ "address": clickedOrg.address }, function(results, status) {
			if (status === "OK") {
				let pos = results[0].geometry.location
				resultsMap.setCenter(pos)
			}
		})
	}

	geocodeAddress = (geocoder, resultsMap, address, name) => {
		const { google } = this.props;

		geocoder.geocode({ "address": address }, function(results, status) {
			// If address is valid, then create a new marker using the coords
			if (status === "OK") {
				let marker = new google.maps.Marker({
					map: resultsMap,
					position: results[0].geometry.location
				})
				console.log("results: ", results[0].geometry.location)
				// TODO: Get infoWindows working with org markers
				// let infoWindow = new google.maps.InfoWindow()
				// infoWindow.setContent(name)
				// infoWindow.open(resultsMap)
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