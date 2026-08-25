<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRequests
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($request->is('api/auth/*')) {
            Log::channel('single')->info('Auth request', [
                'ip'     => $request->ip(),
                'method' => $request->method(),
                'url'    => $request->url(),
                'status' => $response->getStatusCode(),
                'user'   => $request->user()?->email ?? 'non connecté'
            ]);
        }

        return $response;
    }
}