<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreTodoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['string'],
            'status' => ['string', 'in:Completed,Pending,Cancelled'],
            'due_date' => ['date_format:Y-m-d H:i'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'due_date' => date('Y-m-d H:i', strtotime($this->dueDate)),
        ]);
    }
}
