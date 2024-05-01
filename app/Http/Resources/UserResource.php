<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(
        Request $request
    ): array {
        // Define the time zone for Dhaka
        $dhakaTimeZone = 'Asia/Dhaka';

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            // Format dates to Y-m-d H:i:s with AM/PM and set to time zone
            'created_at' => Carbon::parse($this->created_at)
                ->setTimezone($dhakaTimeZone)
                ->format('Y-m-d, h:i:s A'),
            'updated_at' => Carbon::parse($this->updated_at)
                ->setTimezone($dhakaTimeZone)
                ->format('Y-m-d, h:i:s A'),
        ];
    }
}
