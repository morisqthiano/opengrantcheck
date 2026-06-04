<?php

use App\Http\Controllers\ComplianceCheckController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuidelineController;
use App\Http\Controllers\ProposalController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', DashboardController::class);

Route::get('/guidelines', [GuidelineController::class, 'index']);
Route::post('/guidelines', [GuidelineController::class, 'store']);

Route::get('/proposals', [ProposalController::class, 'index']);
Route::post('/proposals', [ProposalController::class, 'store']);

Route::get('/checks', [ComplianceCheckController::class, 'index']);
Route::post('/checks/run/{proposal}', [ComplianceCheckController::class, 'run']);
Route::get('/checks/result/{proposal}', [ComplianceCheckController::class, 'result']);
