import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
				supabaseResponse = NextResponse.next({
					request,
				});
				cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
			},
		},
	});

	// Do not run code between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: DO NOT REMOVE auth.getUser()
	const pathname = request.nextUrl.pathname;

	if (pathname === "/") return NextResponse.redirect(new URL("/newsfeed/school", request.nextUrl));

	const {
		data: { user },
	} = await supabase.auth.getUser();

	//? User not authenticated
	if (
		!user &&
		!pathname.startsWith("/admin/login") &&
		!pathname.startsWith("/api/auth/create-user") &&
		!pathname.startsWith("/api/auth/login") &&
		!pathname.startsWith("/api/auth/confirm-email") &&
		!pathname.startsWith("/api/student-application/create") &&
		pathname !== "/"
	) {
		console.log("Not Authenticated... re-routing");

		const url = request.nextUrl.clone();
		url.pathname = "/admin/login";
		return NextResponse.redirect(url);
	}

	//? User Authenticated
	if (user && (pathname.startsWith("/admin/login") || pathname.startsWith("/newsfeed"))) {
		console.log("Authenticated... re-routing");

		const url = request.nextUrl.clone();
		const role = user?.user_metadata.role.name || user?.user_metadata.role;

		switch (role) {
			case "admin":
				url.pathname = "/admin/dashboard/newsfeed-management";
				break;
			case "teacher":
				url.pathname = "/teacher/dashboard/newsfeed-management";
				break;
			case "staff_jabatan":
				url.pathname = "/staff-jabatan/dashboard/admission-management";
		}
		return NextResponse.redirect(url);
	}

	//? Admin User Authenticated
	if (user && user?.user_metadata.role !== "admin" && pathname.startsWith("/admin")) {
		console.log("Unauthorized for Admin route... re-routing");

		const url = request.nextUrl.clone();
		const role = user?.user_metadata.role.name || user?.user_metadata.role;

		switch (role) {
			case "admin":
				url.pathname = "/admin/dashboard/newsfeed-management";
				break;
			case "teacher":
				url.pathname = "/teacher/dashboard/newsfeed-management";
				break;
			case "staff_jabatan":
				url.pathname = "/staff-jabatan/dashboard/admission-management";
		}
		return NextResponse.redirect(url);
	}

	//? Teacher User Authenticated
	if (user && user?.user_metadata.role?.name !== "teacher" && pathname.startsWith("/teacher")) {
		console.log("Unauthorized for Teacher route... re-routing");

		const url = request.nextUrl.clone();
		const role = user?.user_metadata.role.name || user?.user_metadata.role;

		switch (role) {
			case "admin":
				url.pathname = "/admin/dashboard/newsfeed-management";
				break;
			case "teacher":
				url.pathname = "/teacher/dashboard/newsfeed-management";
				break;
			case "staff_jabatan":
				url.pathname = "/staff-jabatan/dashboard/admission-management";
		}
		return NextResponse.redirect(url);
	}

	//? Staff Jabatan User Authenticated
	if (user && user?.user_metadata.role !== "staff_jabatan" && pathname.startsWith("/staff-jabatan")) {
		console.log("Unauthorized for Admin route... re-routing");

		const url = request.nextUrl.clone();
		const role = user?.user_metadata.role.name || user?.user_metadata.role;

		switch (role) {
			case "admin":
				url.pathname = "/admin/dashboard/newsfeed-management";
				break;
			case "teacher":
				url.pathname = "/teacher/dashboard/newsfeed-management";
				break;
			case "staff_jabatan":
				url.pathname = "/staff-jabatan/dashboard/admission-management";
		}
		return NextResponse.redirect(url);
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
