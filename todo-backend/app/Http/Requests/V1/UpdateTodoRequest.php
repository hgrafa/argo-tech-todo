<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTodoRequest extends FormRequest
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
        $httpMethod = $this->method();

        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['string'],
            'isCompleted' => ['sometimes', 'boolean'],
            'due_date' => ['sometimes', 'date_format:Y-m-d H:i'],
        ];

        if ($httpMethod === 'PATCH') {
            $rules = array_map(function ($rule) {
                $rule[] = 'sometimes';
                return $rule;
            }, $rules);
        }

        return $rules;
    }

    protected function prepareForValidation()
    {
        if ($this->dueDate) {
            $this->merge([
                'due_date' => date('Y-m-d H:i', strtotime($this->dueDate)),
            ]);
        }
    }
}
