Router.map(function () {

	/**
	 * Ver conejitas sin aprobar
	 */
	this.route('unapprovedConejitas', {
		path: '/admin/conejitas/unapproved',
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		waitOn: function () {
			return orion.admin.getAdminSubscriptions();
		}
	});

	/**
	 * Aprobar conejita seleccionada
	 */
	this.route('approveConejita', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/conejitas/approve/:_id',
		/*onBeforeAction: function() {
			return orion.users.ensureRoutePermissions('entity.' + this.params.entity)(this);
		},*/
		waitOn: function () {
			return _.union(orion.subs.subscribe('entity', 'conejitas', { _id: this.params._id }), orion.admin.getAdminSubscriptions());
		},
		data: function() {
			var entity = orion.entities.conejitas;
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	});

	/**
	 * Muestra diálogo para enviarle un email
	 */
	this.route('unapproveConejita', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/admin/conejitas/:_id/delete',
		onBeforeAction: function() {
			return orion.users.ensureRoutePermissions('entity.conejitas')(this);
		},
		waitOn: function () {
			return _.union(orion.subs.subscribe('entity', 'conejitas', { _id: this.params._id }), orion.admin.getAdminSubscriptions());
		},
		data: function() {
			var entity = _.findWhere(orion.entities, {name: 'conejitas'});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		}
	});

	/**
	 * Pagos conejitas
	 */

	/**
	 * Comenzar Pagos
	 */

	this.route('khipuPay', {
		layoutTemplate: 'adminLayout',
		loadingTemplate: 'adminLoading',
		path: '/khipu/conejitas/:_id/pagar',
		onBeforeAction: function() {
			return orion.users.ensureRoutePermissions('entity.conejitas')(this);
		},
		waitOn: function () {
			return _.union(orion.subs.subscribe('entity', 'conejitas', { _id: this.params._id }), orion.admin.getAdminSubscriptions());
		},
		data: function() {
			var entity = _.findWhere(orion.entities, {name: 'conejitas'});
			return {
				entity: entity,
				item: entity.collection.findOne(this.params._id)
			}
		},
		action: function(){
			if(this.isReady()){
				KhipuLib.onLoad({
					elementId: 'pay-button',
					data: {"id":"ghyaq9jbydyb","bill-id":"E24ZS","url":"https://khipu.com/payment/show/ghyaq9jbydyb","manual-url":"https://khipu.com/payment/manual/ghyaq9jbydyb","mobile-url":"khipu:///pos/ghyaq9jbydyb","ready-for-terminal":true}
				})
			}
		}
	});

    /**
     * Ofertas especiales
     */
    // Lista de ofertas sin aprobar
    this.route('unapprovedPrices', {
        path: '/admin/unapprovedPrices',
        layoutTemplate: 'adminLayout',
        loadingTemplate: 'adminLoading',
        waitOn: function () {
            return orion.admin.getAdminSubscriptions();
        }
    });

    // Aprobar Ofertas. (Detalle)
    this.route('approvePrices', {
        path: '/admin/approvePrices/:_id',
        layoutTemplate: 'adminLayout',
        loadingTemplate: 'adminLoading',
        waitOn: function () {
            return _.union(orion.subs.subscribe('entity', 'conejitas', { _id: this.params._id }), orion.admin.getAdminSubscriptions());
        }
    });

});
