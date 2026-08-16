<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('demande_id')->constrained('demandes')->onDelete('cascade');
            $table->decimal('montant', 10, 2);
            $table->enum('moyen_paiement', ['wave', 'orange_money', 'carte'])->default('wave');
            $table->enum('statut', ['en_attente', 'confirme', 'echoue'])->default('en_attente');
            $table->string('reference_transaction')->nullable();
            $table->timestamp('date_transaction')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};