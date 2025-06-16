"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";

import * as PhosphorIcons from "@phosphor-icons/react/dist/ssr";
import { Icon, IconProps, SpinnerGap } from "@phosphor-icons/react";
import { cn } from "@/utils/functions/clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	customLoadingState?: boolean;
	color?: "dark-blue" | "off-white" | "border-white" | "danger";
	iconName?: keyof typeof PhosphorIcons;
	iconSize?: number;
	iconWeight?: IconProps["weight"];
	iconSide?: "left" | "right";
}

export default function Button({
	text,
	color = "dark-blue",
	customLoadingState,
	iconName,
	iconSize = 18,
	iconWeight = "regular",
	iconSide = "left",
	className = "",
	...props
}: ButtonProps) {
	const [loading, setLoading] = useState<boolean>(false);
	const Icon = PhosphorIcons[iconName as keyof typeof PhosphorIcons] as Icon;

	useEffect(() => {
		if (customLoadingState !== undefined) {
			setLoading(customLoadingState);
		}
	}, [customLoadingState]);

	async function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (props.onClick) {
			if (customLoadingState !== undefined) {
				await props.onClick(e);
			} else {
				setLoading(true);
				await props.onClick(e);
				setLoading(false);
			}
		}
	}

	return (
		<button
			{...props}
			onClick={handleOnClick}
			className={cn(
				`${
					color === "dark-blue"
						? "bg-dark-blue text-white"
						: color === "off-white"
							? "bg-off-white text-black"
							: color === "border-white"
								? "bg-white text-black"
								: color === "danger"
									? "bg-danger text-white"
									: ""
				} ${color === "off-white" || color === "border-white" ? "border-dark" : "border-transparent"} ${
					iconSide === "left" ? "flex-row" : "flex flex-row-reverse"
				} flex items-center justify-center px-4 py-2 border-2 rounded-[4px] font-medium gap-2 transition-transform duration-300 cursor-pointer hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed`,
				className
			)}
			disabled={loading}
		>
			{iconName && (
				<Icon
					size={iconSize}
					weight={iconWeight}
					className={`${
						color === "dark-blue" ? "text-white" : color === "off-white" ? " text-black" : color === "danger" ? "text-white" : ""
					}`}
				/>
			)}
			{loading ? (
				<SpinnerGap
					size={20}
					weight="bold"
					className={`${
						color === "dark-blue" ? "text-white" : color === "off-white" ? " text-black" : color === "danger" ? "text-white" : ""
					} animate-spin`}
				/>
			) : (
				<p className="text-nowrap">{text}</p>
			)}
		</button>
	);
}
