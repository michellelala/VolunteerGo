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
			const { google } = this.props;
			const maps = google.maps;

			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef);
		
			let zoom = 14;
			let lat = 37.774929;
			let lng = -122.419416;``
			const center = new maps.LatLng(lat, lng)
			const mapConfig = Object.assign({}, {
				center: center,
				zoom: zoom
			})
			this.map = new maps.Map(node, mapConfig)
		}
	}

	render() {
		const style = {
			width: "70vw",
			height: "70vh"
		}

		return (
			<div ref="map" style={style}>
				Loading map...
			</div>
		)
	}
}