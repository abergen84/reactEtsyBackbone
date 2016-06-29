// const React = require('react'),
// 	ReactDOM = require('react-dom'),
// 	Backbone = require('backbone')

import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ListingsView from './ListingsView'  //import <top level variable name> from <filename>
import ListingDetailView from './ListingDetailView'  //import <top level variable name> from <filename>

// console.log('listingsview looks like this: ' + ListingsView)

const app = function() {

	"use strict";

console.log('incoming..')

var EtsyCollection = Backbone.Collection.extend({
	url: "https://openapi.etsy.com/v2/listings/active.js",
	_apikey: "4jls0ietsf4fdx1hkkdghcie",
	parse: function(rawJSON) {
		return rawJSON.results
	} 	
})

var EtsyModel = Backbone.Model.extend({
	url: function() {
		return "https://openapi.etsy.com/v2/listings/" + this.id + '.js'
	},
	
	_apikey: "4jls0ietsf4fdx1hkkdghcie",
	
	parse: function(rawJSON) {
		return rawJSON.results
	},

	initialize: function(id) {
		this.id = id
	}
})

var EtsyRouter = Backbone.Router.extend({
	routes: {
		"search/:keywords": "doSearch",
		"detail/:id":"doDetailView",
		"home":"goHome",
		"*catchall":"returnToHomepage"
	},

	goHome: function() {
		var etsyCollection = new EtsyCollection()
		etsyCollection.fetch({
			dataType: 'jsonp',
			data: {
				api_key: etsyCollection._apikey,
				includes: "Images,Shop"
			}
		}).then(function(){
			ReactDOM.render(<ListingsView listingsColl={etsyCollection} />, document.querySelector('.container'))
		})

		// var etsyMultipleView = new EtsyMultipleView(etsyCollection)
	},

	doSearch: function(keywords) {
		var searchCollection = new EtsyCollection()
		searchCollection.fetch({
			dataType: 'jsonp',
			data: {
				api_key: searchCollection._apikey,
				includes: "Images,Shop",
				keywords: keywords
			}
		}).then(function(){
			ReactDOM.render(<ListingsView listingsColl={searchCollection} />, document.querySelector('.container'))
		})

		// var searchView = new EtsyMultipleView(searchCollection)
	},

	doDetailView: function(id) {
		var etsyModel = new EtsyModel(id)
		etsyModel.fetch({
			dataType: 'jsonp',
			data: {
				api_key: etsyModel._apikey,
				includes: "Images,Shop"
			}
		}).then(function(){
			ReactDOM.render(<ListingDetailView listingMod={etsyModel} />, document.querySelector('.container'))
		})
		// var etsySingleView = new EtsySingleView(etsyModel)

	},

	returnToHomepage: function() {
		location.hash = "home";
	},

	initialize: function() {
		Backbone.history.start()
	}

})

new EtsyRouter();

}

app()