import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './UserNavigation.css';

// dead function for undefined event handlers
function noop () {
	return;
}

class UserNavigation extends React.Component {

	// define allowed props across all instances of this type of component
  static propTypes = {
    defaultRootClassName: PropTypes.string,
    customRootClassNameSuffix: PropTypes.string,
    list: PropTypes.array.isRequired
  }

  // define default props across all instances of this type of component
  static defaultProps = {
    defaultRootClassName: 'navigation',
    rootClassName: '',
    list: [
    	<Link to="/" key="0a">Home</Link>
    ]
  }

	// use a supplied Array of navigation objects
	render () {

		const self = this

		function generateRootClassName () {
			return (self.props.customRootClassNameSuffix) ? self.props.defaultRootClassName + '-' + self.props.customRootClassNameSuffix : self.props.defaultRootClassName
		}

		// output markup for navigation
		return (

			<ul	className={
				generateRootClassName()
			}>
				{
				this.props.list.map( function (listItem, i) {
					return <li
									key={i}
									className={generateRootClassName() + '_item'}>

									<Link
										key={i}
										to={listItem.to}
										onClick={listItem.onClick || noop}
										onMouseEnter={listItem.onMouseEnter || noop}
										onMouseLeave={listItem.onMouseLeave || noop}
										className={generateRootClassName() + '_link'}>
											{listItem.name}
									</Link>
								</li>
				})
				}
			</ul>
		)
	}
}

export default UserNavigation;
