<?php

/**
 * Plugin Name: omCleaner
 * Plugin URI: https://www.omdesign.cz
 * Description: Cleanup content
 * Version: 1.0
 * Author: Roman Ožana
 * Author URI: https://www.omdesign.cz/contact
 *
 * @author Roman Ozana <ozana@omdesign.cz>
 */
class omCleaner {

	public function __construct() {
		add_action('init', [$this, 'init']);
	}

	public function init() {
		global $pagenow;
		if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) return;
		if (get_user_option('rich_editing') !== 'true') return;
		if (in_array($pagenow, ['post.php', 'post-new.php']) === false) return;

		add_filter('mce_external_plugins', [$this, 'addCleanerPlugin']);
		add_filter('mce_buttons_2', [$this, 'addCleanButton']);
	}

	public function addCleanerPlugin($plugin_array) {
		$plugin_array['omCleaner'] = plugins_url('js/omCleanerPlugin.js?v=123456', __FILE__);
		return $plugin_array;
	}

	public function addCleanButton($buttons) {
		$pos = array_search('removeformat', $buttons);
		return array_merge(array_slice($buttons, 0, $pos), ['omCleaner'], array_slice($buttons, $pos));
	}
}

if (defined('ABSPATH')) return new omCleaner;
