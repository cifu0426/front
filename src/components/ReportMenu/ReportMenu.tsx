"use client";
import React from 'react';
import styles from './ReportMenu.module.scss';

export type ReportMenuProps = {
}

const ReportMenu: React.FC<ReportMenuProps>  = ({}) => {
	return (
		<div className={styles.reportmenu}>
			<div className="container text-center mx-auto grid grid-cols-4 gap-4">
				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold">Today's sales report</h2>
				</div>
				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold">Last week's sales report</h2>
				</div>
				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold">Last month's sales report</h2>
				</div>
				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold">Best-selling products</h2>
				</div>
			</div>
 		</div>
	);
};

export default ReportMenu;
