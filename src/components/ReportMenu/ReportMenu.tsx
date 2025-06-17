"use client";
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOP_PRODUCTOS_MAS_VENDIDOS } from '@/lib/graphql/queries';
import { useSales } from '@/hooks/useSales';
import styles from './ReportMenu.module.scss';

export type ReportMenuProps = object

const ReportMenu: React.FC<ReportMenuProps> = ({}) => {
	const { 
		ventasHoy, 
		ventasSemana, 
		ventasMes, 
		totalRevenueToday,
		totalRevenueWeek,
		totalRevenueMonth,
		loadingVentasHoy, 
		loadingVentasSemana, 
		loadingVentasMes 
	} = useSales();
	
	const { data: topProductos, loading: loadingTop } = useQuery(GET_TOP_PRODUCTOS_MAS_VENDIDOS);

	return (
		<div className={styles.reportmenu}>
			<div className="container text-center mx-auto grid grid-cols-4 gap-4">
				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold mb-2">Today&apos;s Sales Report</h2>
					{loadingVentasHoy ? (
						<div className="animate-pulse">
							<div className="h-4 bg-gray-300 rounded mb-2"></div>
							<div className="h-4 bg-gray-300 rounded"></div>
						</div>
					) : (
						<div>
							<p className="text-2xl font-bold text-green-600">${totalRevenueToday.toFixed(2)}</p>
							<p className="text-sm text-gray-600">
								{ventasHoy.length} ventas
							</p>
						</div>
					)}
				</div>

				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold mb-2">Last Week&apos;s Sales Report</h2>
					{loadingVentasSemana ? (
						<div className="animate-pulse">
							<div className="h-4 bg-gray-300 rounded mb-2"></div>
							<div className="h-4 bg-gray-300 rounded"></div>
						</div>
					) : (
						<div>
							<p className="text-2xl font-bold text-blue-600">${totalRevenueWeek.toFixed(2)}</p>
							<p className="text-sm text-gray-600">
								{ventasSemana.length} ventas
							</p>
						</div>
					)}
				</div>

				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold mb-2">Last Month&apos;s Sales Report</h2>
					{loadingVentasMes ? (
						<div className="animate-pulse">
							<div className="h-4 bg-gray-300 rounded mb-2"></div>
							<div className="h-4 bg-gray-300 rounded"></div>
						</div>
					) : (
						<div>
							<p className="text-2xl font-bold text-purple-600">${totalRevenueMonth.toFixed(2)}</p>
							<p className="text-sm text-gray-600">
								{ventasMes.length} ventas
							</p>
						</div>
					)}
				</div>

				<div className="bg-sky-100 p-4 rounded shadow">
					<h2 className="text-xl font-bold mb-2">Best-Selling Products</h2>
					{loadingTop ? (
						<div className="animate-pulse">
							<div className="h-4 bg-gray-300 rounded mb-2"></div>
							<div className="h-4 bg-gray-300 rounded"></div>
						</div>
					) : (
						<div>
							{topProductos?.topProductoMasVendidos?.length > 0 ? (
								<div className="text-left">
									{topProductos.topProductoMasVendidos.slice(0, 3).map((producto: any, index: number) => (
										<div key={producto.id} className="text-sm mb-1">
											<span className="font-semibold">{index + 1}.</span> {producto.nombre}
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-gray-600">No hay datos disponibles</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReportMenu;
