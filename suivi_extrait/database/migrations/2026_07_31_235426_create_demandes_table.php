<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->foreignId('citoyen_id')->constrained('citoyens')->onDelete('cascade');
            $table->foreignId('agent_id')->nullable()->constrained('agents')->onDelete('set null');
            $table->foreignId('type_demande_id')->constrained('type_demandes')->onDelete('cascade');
            $table->enum('statut', [
                'soumise',
                'en_instruction',
                'a_completer',
                'validee',
                'rejetee',
                'expediee',
                'recue'
            ])->default('soumise');
            $table->timestamp('date_soumission')->nullable();
            $table->timestamp('date_retrait')->nullable();
            $table->text('observation')->nullable();
            $table->json('informations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};